"""Regression: a truncated clip must not pass as finished.
Run: python3 tests/desktop/clipcheck_test.py  (needs ffmpeg and ffprobe)"""
import os, subprocess, sys, tempfile
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', 'desktop', 'tauri', 'scripts'))
import clipcheck
clipcheck.MIN_BYTES = 1000  # tiny synthetic clips

with tempfile.TemporaryDirectory() as t:
    full = os.path.join(t, 'full.mp4')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'lavfi', '-i', 'testsrc=size=320x180:rate=25:duration=20',
                    '-f', 'lavfi', '-i', 'sine=frequency=440:duration=20', '-c:v', 'libx264', '-c:a', 'aac',
                    '-movflags', '+faststart', full], check=True)
    cut = os.path.join(t, 'cut.mp4')
    data = open(full, 'rb').read()
    open(cut, 'wb').write(data[:len(data) // 3])  # moov is first, mdat is cut: header still says 20s
    short = os.path.join(t, 'short.mp4')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', full, '-t', '5', '-c', 'copy', short], check=True)
    missing = os.path.join(t, 'nope.mp4')

    assert clipcheck.raw_ok(full), 'complete file rejected'
    assert not clipcheck.raw_ok(cut), 'truncated file accepted'
    assert not clipcheck.raw_ok(missing), 'missing file accepted'
    assert clipcheck.output_ok(full, full), 'same-length output rejected'
    assert not clipcheck.output_ok(short, full), 'short output accepted'
    assert not clipcheck.output_ok(missing, full), 'missing output accepted'
print('clipcheck ok')
