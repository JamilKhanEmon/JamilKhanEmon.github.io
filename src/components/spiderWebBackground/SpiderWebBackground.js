import React, {useContext, useEffect, useRef} from "react";
import StyleContext from "../../contexts/StyleContext";
import "./SpiderWebBackground.scss";

/**
 * Interactive Spider-Web & Neural Mesh canvas background.
 * Connects drifting nodes with web-like filaments that react to cursor movement and clicks.
 */
export default function SpiderWebBackground() {
  const canvasRef = useRef(null);
  const {isDark} = useContext(StyleContext);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: null,
      y: null,
      radius: 190
    };

    const pulses = [];

    const getNodeCount = () => {
      if (width < 640) return 32;
      if (width < 1024) return 52;
      return 78;
    };

    const createNodes = () => {
      const count = getNodeCount();
      return Array.from({length: count}, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        radius: Math.random() * 1.6 + 1.1
      }));
    };

    let nodes = createNodes();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      nodes = createNodes();
    };

    const handleMouseMove = e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleClick = e => {
      if (prefersReducedMotion) return;
      pulses.push({
        x: e.clientX,
        y: e.clientY,
        radius: 6,
        maxRadius: 170,
        alpha: 0.55
      });

      // Gently ripple nearby web nodes away from click
      nodes.forEach(node => {
        const dx = node.x - e.clientX;
        const dy = node.y - e.clientY;
        const dist = Math.hypot(dx, dy);
        if (dist > 0 && dist < 160) {
          const force = (160 - dist) / 160;
          node.vx += (dx / dist) * force * 1.4;
          node.vy += (dy / dist) * force * 1.4;
        }
      });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("click", handleClick);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const nodeColor = isDark
        ? "rgba(129, 140, 248, 0.72)"
        : "rgba(79, 70, 229, 0.52)";
      const lineRGB = isDark ? "99, 102, 241" : "79, 70, 229";
      const accentRGB = isDark ? "0, 229, 255" : "124, 58, 237";
      const connectDistance = width < 640 ? 115 : 150;

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        if (!prefersReducedMotion) {
          n.x += n.vx;
          n.y += n.vy;

          // Dampen burst velocity back toward calm drift
          n.vx *= 0.992;
          n.vy *= 0.992;
          if (Math.abs(n.vx) < 0.12) n.vx += (Math.random() - 0.5) * 0.04;
          if (Math.abs(n.vy) < 0.12) n.vy += (Math.random() - 0.5) * 0.04;

          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
          n.x = Math.max(0, Math.min(width, n.x));
          n.y = Math.max(0, Math.min(height, n.y));
        }

        // Connect web filaments between nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectDistance) {
            const alpha = (1 - dist / connectDistance) * (isDark ? 0.24 : 0.16);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${lineRGB}, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.85;
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
          }
        }

        // Connect cursor to nearby nodes like a spider-web anchor
        if (mouse.x !== null && mouse.y !== null) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * (isDark ? 0.55 : 0.42);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${accentRGB}, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 1.15;
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();

            if (!prefersReducedMotion && dist > 28) {
              n.x -= (dx / dist) * 0.32;
              n.y -= (dy / dist) * 0.32;
            }
          }
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();
      }

      // Draw expanding click web pulses
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.radius += 3.8;
        pulse.alpha *= 0.94;

        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${accentRGB}, ${pulse.alpha.toFixed(3)})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        if (pulse.radius >= pulse.maxRadius || pulse.alpha < 0.02) {
          pulses.splice(p, 1);
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = window.requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("click", handleClick);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="spider-web-canvas"
      aria-hidden="true"
    />
  );
}
