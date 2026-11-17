import AnalysisIcon from "./analysis";
import HardwareIcon from "./hardware";
import NetworkIcon from "./network";
import WebIcon from "./web";

/**
 * Registry icon.
 *
 * Menambah icon baru:
 *   1. buat file `src/components/icons/<nama>.jsx` yang export default component
 *      yang membungkus <Svg> dari "./svg"
 *   2. import di sini + tambahkan satu entri ke ICONS
 *   3. pakai: <Icon name="<nama>" />
 */
const ICONS = {
  analysis: AnalysisIcon,
  hardware: HardwareIcon,
  network: NetworkIcon,
  web: WebIcon,
};

export function Icon({ name, className = "size-6", ...props }) {
  const Component = ICONS[name];
  if (!Component) return null;
  return <Component className={className} {...props} />;
}

export { AnalysisIcon, HardwareIcon, NetworkIcon, WebIcon };
