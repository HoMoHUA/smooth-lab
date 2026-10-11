# اتصال به MUI

آداپتور MUI به متغیرهای CSS تم نیاز دارد:

```tsx
const theme = createTheme({ cssVariables: true, colorSchemes: { light: true, dark: true } });
```

```tsx
import { useSmoothLab } from "smooth-lab-extensions/react";
import "smooth-lab-extensions/smooth-lab.css";
import "smooth-lab-extensions/adapters/mui.css";

export function Hero() {
  const ref = useSmoothLab<HTMLDivElement>();
  return (
    <Box ref={ref} sx={{ py: 10 }}>
      <Typography variant="h1" data-sl-rise>هر چیزی را بفهمید</Typography>
      <Button variant="contained" data-sl-magnetic="0.35">شروع</Button>
    </Box>
  );
}
```

اگر MUI با Emotion استایل‌ها را در `<head>` تزریق می‌کند، آن استایل‌ها بدون layer هستند و بر اکستنشن‌ها مقدم‌اند؛ تنظیم اضافه لازم نیست.

| Smooth Lab | MUI |
|---|---|
| `--sl-color-accent` / `-contrast` | `--mui-palette-primary-main` / `-contrastText` |
| `--sl-color-highlight` / `-contrast` | `--mui-palette-secondary-main` / `-contrastText` |
| `--sl-color-surface` / `-raised` | `--mui-palette-background-default` / `-paper` |
| `--sl-color-text` / `-muted` | `--mui-palette-text-primary` / `-secondary` |
| `--sl-color-border` | `--mui-palette-divider` |
| `--sl-radius-md` | `--mui-shape-borderRadius` |

کامپوننت‌های React: رنگ‌ها را با `var(--mui-palette-primary-main)` بدهید. کلاس‌های Tailwind داخل فایل‌ها را می‌توانید با `sx` روی wrapper جایگزین کنید.
