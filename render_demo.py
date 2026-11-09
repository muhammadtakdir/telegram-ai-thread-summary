import os
import sys
import math
from PIL import Image, ImageDraw, ImageFont

FRAMES_DIR = '/home/sandi/apps/telegram-ai-thread-summary/demo_frames'
OUTPUT_DIR = '/home/sandi/apps/telegram-ai-thread-summary/render_stream'
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Load keyframes
img_base = Image.open(f'{FRAMES_DIR}/f01_pill.png').convert('RGB')
img_drawer = Image.open(f'{FRAMES_DIR}/f02_drawer_open.png').convert('RGB')
img_jump = Image.open(f'{FRAMES_DIR}/f03_split_jump.png').convert('RGB')

w, h = img_base.size # 1920, 1080
fps = 30
frame_count = 0

def save_frame(pil_img):
    global frame_count
    frame_count += 1
    filename = f"{OUTPUT_DIR}/frame_{frame_count:05d}.jpg"
    pil_img.save(filename, quality=92)

# Helper to draw cursor
def draw_cursor(base_img, x, y, clicking=False, tip_text=None):
    img = base_img.copy()
    draw = ImageDraw.Draw(img)
    
    # Cursor circle with glow
    r = 14 if not clicking else 10
    color = (96, 165, 250) if not clicking else (192, 132, 252)
    ring_color = (255, 255, 255)
    
    # Outer ring
    draw.ellipse([x - r - 4, y - r - 4, x + r + 4, y + r + 4], outline=color, width=3)
    draw.ellipse([x - r, y - r, x + r, y + r], fill=ring_color, outline=color, width=2)
    
    if tip_text:
        # Tooltip bubble
        tw = len(tip_text) * 8 + 20
        th = 28
        tx = x + 24
        ty = y - 14
        draw.rounded_rectangle([tx, ty, tx + tw, ty + th], radius=6, fill=(15, 23, 42), outline=(96, 165, 250), width=1)
        draw.text((tx + 10, ty + 6), tip_text, fill=(255, 255, 255))
        
    return img

print("Generating video frames...")

# Phase 1: View incoming messages & pill glowing (0 - 2.5s = 75 frames)
# Pill location approx: (1520, 930)
cursor_x, cursor_y = 960, 540
target_pill_x, target_pill_y = 1530, 930

for f in range(45):
    # Idling on chat stream
    save_frame(img_base)

# Moving cursor to Floating Pill (45 frames = 1.5s)
for f in range(45):
    t = f / 44.0
    # smooth ease-in-out
    ease = 3*t*t - 2*t*t*t
    cx = int(cursor_x + (target_pill_x - cursor_x) * ease)
    cy = int(cursor_y + (target_pill_y - cursor_y) * ease)
    f_img = draw_cursor(img_base, cx, cy, tip_text="Klik: AI Summary Pill")
    save_frame(f_img)

# Click effect on pill (15 frames = 0.5s)
for f in range(15):
    f_img = draw_cursor(img_base, target_pill_x, target_pill_y, clicking=True, tip_text="Memproses ringkasan...")
    save_frame(f_img)

# Phase 2: Slide-in Drawer animation (15 frames = 0.5s)
# Slide from right: drawer is ~430px wide
drawer_w = 430
for f in range(15):
    t = (f + 1) / 15.0
    ease = 1 - (1 - t)**3
    cur_w = int(drawer_w * ease)
    
    frame = img_base.copy()
    # Crop right portion from img_drawer and paste
    crop_right = img_drawer.crop((w - cur_w, 0, w, h))
    frame.paste(crop_right, (w - cur_w, 0))
    save_frame(frame)

# Phase 3: Inspecting AI Summary Drawer (60 frames = 2.0s)
# Cursor moves up to Point 1: "1. Privasi Wajah & Revisi Slide 4"
# Point 1 Jump Button approx: (1800, 310)
p1_x, p1_y = 1790, 315

for f in range(45):
    t = f / 44.0
    ease = 3*t*t - 2*t*t*t
    cx = int(target_pill_x + (p1_x - target_pill_x) * ease)
    cy = int(target_pill_y + (p1_y - target_pill_y) * ease)
    f_img = draw_cursor(img_drawer, cx, cy, tip_text="Lihat Chat Poin 1")
    save_frame(f_img)

# Hover & click on Point 1 (15 frames = 0.5s)
for f in range(15):
    f_img = draw_cursor(img_drawer, p1_x, p1_y, clicking=True, tip_text="Melompat ke pesan...")
    save_frame(f_img)

# Phase 4: Jump to message with Highlight Flash & Split View (90 frames = 3.0s)
for f in range(90):
    save_frame(img_jump)

# Phase 5: Move to Point 3 ("Keputusan Rilis & Keamanan Berkas") (45 frames = 1.5s)
# Point 3 Jump Button approx: (1790, 560)
p3_x, p3_y = 1790, 560
for f in range(45):
    t = f / 44.0
    ease = 3*t*t - 2*t*t*t
    cx = int(p1_x + (p3_x - p1_x) * ease)
    cy = int(p1_y + (p3_y - p1_y) * ease)
    f_img = draw_cursor(img_jump, cx, cy, tip_text="Lihat Chat Poin 3")
    save_frame(f_img)

# Phase 6: Hold & Final Display (45 frames = 1.5s)
for f in range(45):
    f_img = draw_cursor(img_jump, p3_x, p3_y, clicking=False)
    save_frame(f_img)

print(f"Total rendered frames: {frame_count}")
