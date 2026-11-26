"""Integrity checks for the Film-Stationen clip fetch.

A truncated mp4 keeps its full declared duration in the header, so the file
size or the header alone cannot show it. Reading the stream through (copy, no
re-encode) reports how much really decodes."""
import re, subprocess

MIN_BYTES = 100000


def declared_duration(path):
    r = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration',
                        '-of', 'csv=p=0', path], capture_output=True, text=True)
    try:
        return float(r.stdout.strip().splitlines()[-1])
    except Exception:
        return 0.0


def readable_duration(path):
    r = subprocess.run(['ffmpeg', '-nostdin', '-i', path, '-c', 'copy', '-f', 'null', '-'],
                       capture_output=True, text=True)
    ts = re.findall(r'time=(\d+):(\d+):([\d.]+)', r.stderr)
    if r.returncode != 0 or not ts:
        return 0.0
    h, m, s = ts[-1]
    return int(h) * 3600 + int(m) * 60 + float(s)


def raw_ok(path, tol=1.5):
    """True when the download is complete: the stream reads through to its declared length."""
    import os
    if not os.path.exists(path) or os.path.getsize(path) < MIN_BYTES:
        return False
    d = declared_duration(path)
    return d > 1 and abs(readable_duration(path) - d) < tol


def output_ok(out, raw, tol=1.0):
    """True when the 1080p copy has the same length as its raw source."""
    import os
    if not os.path.exists(out) or os.path.getsize(out) < MIN_BYTES:
        return False
    d = declared_duration(out)
    return d > 1 and abs(d - declared_duration(raw)) < tol
