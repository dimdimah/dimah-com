import { Svg } from "./svg";

/** Topologi jaringan — node pusat dengan tiga percabangan. */
export default function NetworkIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="2.5" />
      <circle cx="12" cy="3.75" r="1.5" />
      <circle cx="4" cy="18" r="1.5" />
      <circle cx="20" cy="18" r="1.5" />
      <path d="M12 5.25v4.25M10.15 13.75 5.35 16.9M13.85 13.75l4.8 3.15" />
    </Svg>
  );
}
