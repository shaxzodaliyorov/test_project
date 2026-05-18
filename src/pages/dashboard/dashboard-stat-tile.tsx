import type { ReactNode } from "react";
import { Card, Statistic, theme } from "antd";

type DashboardStatTileProps = {
  title: string;
  value: number;
  icon: ReactNode;
  iconColor?: string;
};

export function DashboardStatTile({
  title,
  value,
  icon,
  iconColor,
}: DashboardStatTileProps) {
  const { token } = theme.useToken();
  const color = iconColor ?? token.colorPrimary;

  return (
    <Card
      size="small"
      variant="outlined"
      styles={{
        body: {
          padding: token.paddingLG,
          background: token.colorFillQuaternary,
        },
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: token.marginMD,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: token.borderRadiusLG,
            background: token.colorFillAlter,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            color,
          }}
        >
          {icon}
        </div>
        <Statistic
          title={title}
          value={value}
          valueStyle={{
            fontWeight: 600,
            fontSize: token.fontSizeHeading4,
          }}
        />
      </div>
    </Card>
  );
}
