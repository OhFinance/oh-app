import { Surface } from "@ohfinance/oh-ui";
import { useHistoryTVL } from "state/tvl/hooks";
import { useMemo } from "react";
import { useTheme } from "@material-ui/core";
import { Line } from "react-chartjs-2";

export const DashboardTVLGraph = () => {
  const [history] = useHistoryTVL();
  const theme = useTheme();

  const isLoaded = history && history[-1];

  const data = useMemo(() => {
    const labels = isLoaded
      ? history[-1]
          .filter((_, i) => i % 24 === 0)
          .map((h) => new Date(h.timestamp).toLocaleDateString())
      : [];

    return {
      labels,
      datasets: [
        {
          label: "Total",
          data: isLoaded
            ? history[-1].filter((_, i) => i % 24 === 0).map((h) => h.tvl)
            : [],
          backgroundColor: theme.palette.primary.dark,
          borderColor: theme.palette.primary.main,
          pointBackgroundColor: theme.palette.primary.dark,
        },
        {
          label: "Ethereum",
          data: isLoaded
            ? history[1].filter((_, i) => i % 24 === 0).map((h) => h.tvl)
            : [],
          backgroundColor: theme.palette.secondary.dark,
          borderColor: theme.palette.secondary.main,
          pointBackgroundColor: theme.palette.secondary.dark,
        },
        {
          label: "Avalanche",
          data: isLoaded
            ? history[43114].filter((_, i) => i % 24 === 0).map((h) => h.tvl)
            : [],
          backgroundColor: theme.palette.error.dark,
          borderColor: theme.palette.error.main,
          pointBackgroundColor: theme.palette.error.dark,
        },
      ],
    };
  }, [isLoaded, history, theme]);

  const options = useMemo(() => {
    return {
      animation: {
        duration: 2000,
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => `$${value.toLocaleString()}`,
          },
        },
        x: {
          reverse: true,
        },
      },
      plugins: {
        legend: {
          position: "bottom" as const,
        },
        tooltip: {
          callbacks: {
            label: (context) =>
              `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`,
          },
        },
        title: {
          display: true,
          text: "Total Value Locked",
          color: theme.palette.text.primary,
          font: {
            size: 16,
          },
        },
      },
    };
  }, [theme]);

  return (
    <Surface>
      <Line data={data} options={options} />
    </Surface>
  );
};
