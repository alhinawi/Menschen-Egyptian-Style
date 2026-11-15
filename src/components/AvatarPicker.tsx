// Avatar picker inside the account panel: upload a photo (client-side crop +
// resize to a small webp data URL), pick a premium preset, or switch back to
// the Google profile photo. Everything saves through PATCH /api/me.

import {useEffect, useRef, useState} from 'react';
import {useUiLanguage} from '../ui-language';
import type {ApiUser} from '../auth/api';
import {updateMe} from '../auth/api';
import {PRESET_COUNT, presetDataUrl, presetSvg} from '../auth/avatar-presets';

const OUT_SIZE = 256;
const MAX_BYTES = 39_000; // API ceiling is ~41k characters; keep headroom

export function AvatarPicker({user, onSaved, onClose}: {user: ApiUser; onSaved: (u: ApiUser) => void; onClose: () => void}) {
  const {t} = useUiLanguage();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cropFile, setCropFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const save = async (avatar: string | null | 'google') => {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      onSaved(await updateMe({avatar}));
    } catch {
      setError(t('Connection problem. Please try again.'));
    } finally {
      setBusy(false);
    }
  };

  const pickPreset = async (index: number) => {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      onSaved(await updateMe({avatar: await presetDataUrl(index)}));
    } catch {
      setError(t('Connection problem. Please try again.'));
    } finally {
      setBusy(false);
    }
  };

  const hasGoogle = Boolean(user.google_avatar) && user.avatar !== user.google_avatar;

  return (
    <div className="avatarPicker" role="group" aria-label={t('Profile photo')}>
      <div className="profileSection">{t('Profile photo')}</div>
      <div className="avatarActions">
        <button type="button" className="authBtn authBtnPrimary avatarUploadBtn" disabled={busy} onClick={() => fileRef.current?.click()}>
          {t('Upload photo')}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          hidden
          onChange={(e) => {
            const f = e.target.files?.[0];
            e.target.value = '';
            if (f) setCropFile(f);
          }}
        />
        {hasGoogle && (
          <button type="button" className="authBtn authBtnGhost" disabled={busy} onClick={() => void save('google')}>
            {t('Use Google photo')}
          </button>
        )}
        {user.avatar && (
          <button type="button" className="authBtn authBtnGhost" disabled={busy} onClick={() => void save(null)}>
            {t('Remove photo')}
          </button>
        )}
      </div>
      <div className="avatarPresetGrid">
        {Array.from({length: PRESET_COUNT}, (_, i) => (
          <button key={i} type="button" className="avatarPreset" disabled={busy} aria-label={`${t('Choose avatar')} ${i + 1}`} onClick={() => void pickPreset(i)}>
            <img src={`data:image/svg+xml;utf8,${encodeURIComponent(presetSvg(i))}`} alt="" width={44} height={44} />
          </button>
        ))}
      </div>
      {error && <div className="authError" role="alert">{error}</div>}
      <button type="button" className="authSwitch" onClick={onClose}>{t('Back')}</button>
      {cropFile && (
        <AvatarCropper
          file={cropFile}
          onCancel={() => setCropFile(null)}
          onDone={async (dataUrl) => {
            setCropFile(null);
            await save(dataUrl);
          }}
        />
      )}
    </div>
  );
}

/** Square crop: drag the photo to position it, slider to zoom, save as webp. */
function AvatarCropper({file, onDone, onCancel}: {file: File; onDone: (dataUrl: string) => void; onCancel: () => void}) {
  const {t} = useUiLanguage();
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({x: 0, y: 0});
  const drag = useRef<{x: number; y: number} | null>(null);
  const BOX = 220;

  useEffect(() => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => setImg(image);
    image.src = url;
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const cover = img ? Math.max(BOX / img.width, BOX / img.height) : 1;
  const scale = cover * zoom;
  const clamp = (v: number, size: number) => Math.min(0, Math.max(BOX - size * scale, v));

  const saveCrop = () => {
    if (!img) return;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = OUT_SIZE;
    const ctx = canvas.getContext('2d')!;
    const k = OUT_SIZE / BOX;
    ctx.drawImage(img, offset.x * k, offset.y * k, img.width * scale * k, img.height * scale * k);
    let quality = 0.9;
    let out = canvas.toDataURL('image/webp', quality);
    while (out.length > MAX_BYTES && quality > 0.4) {
      quality -= 0.1;
      out = canvas.toDataURL('image/webp', quality);
    }
    if (out.length > MAX_BYTES) {
      canvas.width = canvas.height = 192;
      canvas.getContext('2d')!.drawImage(img, offset.x * (192 / BOX), offset.y * (192 / BOX), img.width * scale * (192 / BOX), img.height * scale * (192 / BOX));
      out = canvas.toDataURL('image/webp', 0.8);
    }
    onDone(out);
  };

  return (
    <div className="avatarCropOverlay" role="dialog" aria-label={t('Crop photo')}>
      <div className="avatarCropBox">
        <div
          className="avatarCropViewport"
          style={{width: BOX, height: BOX}}
          onPointerDown={(e) => {
            drag.current = {x: e.clientX - offset.x, y: e.clientY - offset.y};
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            if (!drag.current || !img) return;
            setOffset({x: clamp(e.clientX - drag.current.x, img.width), y: clamp(e.clientY - drag.current.y, img.height)});
          }}
          onPointerUp={() => (drag.current = null)}
        >
          {img && (
            <img
              src={img.src}
              alt=""
              draggable={false}
              style={{width: img.width * scale, height: img.height * scale, transform: `translate(${offset.x}px, ${offset.y}px)`}}
            />
          )}
        </div>
        <label className="avatarZoomRow">
          <span>{t('Zoom')}</span>
          <input type="range" min={1} max={3} step={0.01} value={zoom} onChange={(e) => {
            const z = Number(e.target.value);
            setZoom(z);
            if (img) setOffset((o) => ({x: Math.min(0, Math.max(BOX - img.width * cover * z, o.x)), y: Math.min(0, Math.max(BOX - img.height * cover * z, o.y))}));
          }} />
        </label>
        <div className="avatarCropActions">
          <button type="button" className="authBtn authBtnPrimary" onClick={saveCrop}>{t('Save photo')}</button>
          <button type="button" className="authBtn authBtnGhost" onClick={onCancel}>{t('Cancel')}</button>
        </div>
      </div>
    </div>
  );
}
