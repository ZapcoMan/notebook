import chroma from "chroma-js";
import type { CSSProperties, HTMLAttributes } from "react";
import { useTranslation } from "react-i18next";
import { DEFAULT_TILE_COLOR, normalizeTileColor } from "../features/settings/tileColor";
import { MarkdownPreview } from "../features/markdown/MarkdownPreview";

export interface TileProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "color" | "content" | "title"
> {
  title?: string;
  content: string;
  color?: string;
  width?: number | string;
  rotation?: number;
  fontSize?: number;
  renderMarkdown?: boolean;
  opacity?: number;
  showActions?: boolean;
  onCopy?: () => void;
  onEdit?: () => void;
  onClose?: () => void;
}

const MARK_SIZE = 8;
const MARK_OFFSET = 6;

const cornerPaths = [
  {
    pos: { top: MARK_OFFSET, left: MARK_OFFSET },
    d: `M0,${MARK_SIZE} L0,0 L${MARK_SIZE},0`,
  },
  {
    pos: { top: MARK_OFFSET, right: MARK_OFFSET },
    d: `M0,0 L${MARK_SIZE},0 L${MARK_SIZE},${MARK_SIZE}`,
  },
  {
    pos: { bottom: MARK_OFFSET, left: MARK_OFFSET },
    d: `M0,0 L0,${MARK_SIZE} L${MARK_SIZE},${MARK_SIZE}`,
  },
  {
    pos: { bottom: MARK_OFFSET, right: MARK_OFFSET },
    d: `M${MARK_SIZE},0 L${MARK_SIZE},${MARK_SIZE} L0,${MARK_SIZE}`,
  },
];

function CornerMarks({ color }: { color: string }) {
  return (
    <>
      {cornerPaths.map((mark, index) => (
        <svg
          key={index}
          className="absolute pointer-events-none"
          data-tile-corner-mark="true"
          style={mark.pos as CSSProperties}
          width={MARK_SIZE}
          height={MARK_SIZE}
          viewBox={`0 0 ${MARK_SIZE} ${MARK_SIZE}`}
        >
          <path
            d={mark.d}
            stroke={color}
            strokeWidth="0.8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </>
  );
}

function TileActionBar({
  color,
  onCopy,
  onEdit,
  onClose,
}: {
  color: string;
  onCopy?: () => void;
  onEdit?: () => void;
  onClose?: () => void;
}) {
  const { t } = useTranslation();
  const isLight = chroma(color).luminance() > 0.18;
  const btnColor = isLight ? "rgba(26,26,24,0.55)" : "rgba(255,255,255,0.6)";
  const btnHoverBg = isLight ? "rgba(26,26,24,0.08)" : "rgba(255,255,255,0.12)";
  const closeBtnColor = isLight ? "rgba(220,38,38,0.7)" : "rgba(248,113,113,0.8)";

  return (
    <div
      className="absolute top-2 right-2 z-10 flex items-center gap-0.5 opacity-0 group-hover/tile:opacity-100 transition-opacity duration-200"
      style={{ background: `${btnHoverBg}`, borderRadius: 6, padding: 2 }}
    >
      {onCopy && (
        <button
          type="button"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onCopy();
          }}
          className="w-6 h-6 flex items-center justify-center rounded transition-colors cursor-pointer"
          style={{ color: btnColor }}
          title={t("tile.action.copy", { defaultValue: "复制内容" })}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        </button>
      )}
      {onEdit && (
        <button
          type="button"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="w-6 h-6 flex items-center justify-center rounded transition-colors cursor-pointer"
          style={{ color: btnColor }}
          title={t("tile.action.edit", { defaultValue: "在编辑器中打开" })}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </button>
      )}
      {onClose && (
        <button
          type="button"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="w-6 h-6 flex items-center justify-center rounded transition-colors cursor-pointer"
          style={{ color: closeBtnColor }}
          title={t("tile.action.close", { defaultValue: "关闭" })}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

export function Tile({
  title,
  content,
  color = DEFAULT_TILE_COLOR,
  width = 260,
  rotation = 0,
  fontSize = 14,
  renderMarkdown = false,
  opacity = 1.0,
  showActions = false,
  onCopy,
  onEdit,
  onClose,
  className = "",
  style,
  children,
  ...divProps
}: TileProps) {
  const { t } = useTranslation();
  const tileColor = normalizeTileColor(color);
  const isLightBg = chroma(tileColor).luminance() > 0.18;
  const mixTarget = isLightBg ? "#1a1a18" : "#ffffff";
  const borderColor = chroma.mix(tileColor, mixTarget, 0.18).alpha(0.55).css();
  const cornerColor = chroma.mix(tileColor, mixTarget, 0.3).alpha(0.26).css();
  const titleColor = chroma.mix(tileColor, mixTarget, 0.4).alpha(0.5).css();
  const contentColor = chroma.mix(tileColor, mixTarget, 0.65).alpha(0.85).css();
  const emptyColor = chroma.mix(tileColor, mixTarget, 0.25).alpha(0.4).css();
  const mergedStyle: CSSProperties = {
    width,
    backgroundColor: tileColor,
    borderColor,
    opacity,
    transition: "box-shadow 0.3s ease",
    ...(rotation ? { transform: `rotate(${rotation}deg)` } : {}),
    ...style,
  };

  return (
    <div
      {...divProps}
      className={`app-surface-frame group/tile relative border overflow-hidden select-none shadow-[0_1px_8px_rgba(26,26,24,0.04)] hover:shadow-[0_6px_24px_rgba(26,26,24,0.07)] ${className}`}
      style={mergedStyle}
    >
      <div className="px-4 pt-4 pb-4 h-full overflow-y-auto scrollbar-hidden">
        {title && (
          <div
            className="font-display tracking-wide mb-3 leading-snug"
            style={{ color: titleColor, fontSize: `${fontSize + 1}px` }}
          >
            {title}
          </div>
        )}
        {content ? (
          renderMarkdown ? (
            <div style={{ color: contentColor }}>
              <MarkdownPreview content={content} fontSize={fontSize} />
            </div>
          ) : (
            <div
              className="leading-[1.8] whitespace-pre-wrap font-body"
              style={{ color: contentColor, fontSize: `${fontSize}px` }}
            >
              {content}
            </div>
          )
        ) : (
          <div
            className="font-body text-center py-6"
            style={{ color: emptyColor, fontSize: `${fontSize}px` }}
          >
            {t("tile.empty", { defaultValue: "空" })}
          </div>
        )}
      </div>

      {showActions && (onCopy || onEdit || onClose) && (
        <TileActionBar color={tileColor} onCopy={onCopy} onEdit={onEdit} onClose={onClose} />
      )}
      <CornerMarks color={cornerColor} />
      {children}
    </div>
  );
}
