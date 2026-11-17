import { Svg } from "./svg";

/** CPU / chipset — perakitan & diagnosa hardware. */
export default function HardwareIcon(props) {
  return (
    <Svg {...props}>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <rect x="10" y="10" width="4" height="4" rx="0.5" />
      <path d="M10 7V4M14 7V4M10 20v-3M14 20v-3M7 10H4M7 14H4M20 10h-3M20 14h-3" />
    </Svg>
  );
}
