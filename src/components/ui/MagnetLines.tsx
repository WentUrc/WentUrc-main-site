"use client";

import React, { useRef, useEffect, useState, CSSProperties } from 'react';

interface MagnetLinesProps {
  rows?: number;
  columns?: number;
  containerSize?: string;
  lineColor?: string;
  lineWidth?: string;
  lineHeight?: string;
  baseAngle?: number;
  className?: string;
  style?: CSSProperties;
}

const MagnetLines: React.FC<MagnetLinesProps> = ({
  rows = 9,
  columns = 9,
  containerSize = '80vmin',
  lineColor = '#94a3b8', // 改为更深的灰色，在浅色和深色模式下都能看见
  lineWidth = '1vmin',
  lineHeight = '6vmin',
  baseAngle = -10,
  className = '',
  style = {}
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(true); // 默认为移动端，避免闪烁
  const [mounted, setMounted] = useState(false);
  
  // 检测设备是否为移动端
  useEffect(() => {
    setMounted(true);
    
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px 是 md 断点
    };
    
    // 初始检测
    checkIfMobile();
    
    // 监听窗口大小变化
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  // 处理指针移动逻辑
  useEffect(() => {
    // 如果是移动端或组件尚未挂载，则不添加事件监听
    if (isMobile || !mounted) return;
    
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLSpanElement>('span');

    const onPointerMove = (pointer: { x: number; y: number }) => {
      items.forEach(item => {
        const rect = item.getBoundingClientRect();
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;

        const b = pointer.x - centerX;
        const a = pointer.y - centerY;
        const c = Math.sqrt(a * a + b * b) || 1;
        const r = ((Math.acos(b / c) * 180) / Math.PI) * (pointer.y > centerY ? 1 : -1);

        item.style.setProperty('--rotate', `${r}deg`);
      });
    };

    const handlePointerMove = (e: PointerEvent) => {
      onPointerMove({ x: e.x, y: e.y });
    };

    window.addEventListener('pointermove', handlePointerMove);

    if (items.length) {
      const middleIndex = Math.floor(items.length / 2);
      const rect = items[middleIndex].getBoundingClientRect();
      onPointerMove({ x: rect.x, y: rect.y });
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [isMobile, mounted]);

  const total = rows * columns;
  const spans = Array.from({ length: total }, (_, i) => (
    <span
      key={i}
      className="block origin-center transition-colors duration-300"
      style={{
        backgroundColor: lineColor,
        width: lineWidth,
        height: lineHeight,
        transform: 'rotate(var(--rotate))',
        willChange: 'transform',
        ...({ '--rotate': `${baseAngle}deg` } as CSSProperties)
      }}
    />
  ));

  // 如果是移动端且已挂载，则不渲染组件
  if (isMobile && mounted) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`grid place-items-center ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        width: containerSize,
        height: containerSize,
        ...style
      }}
    >
      {spans}
    </div>
  );
};

export default MagnetLines;
