type discountTagProps = {
  discount: number;
  hasSpecialOffer?: boolean;
  fromColor?: string;
  toColor?: string;
  normalColor?: string;
};

const DiscountTag = ({
  discount,
  hasSpecialOffer = false,
  fromColor = "#CA1619",
  toColor = "#C131DE",
  normalColor = "#a855f7",
}: discountTagProps) => {
  const dynamicStyle = hasSpecialOffer
    ? { backgroundImage: `linear-gradient(to right, ${fromColor}, ${toColor})` }
    : { backgroundColor: normalColor };
  return (
    <span
      className={`text-white text-xs font-bold px-1 py-1 rounded-md shadow-sm`}
      style={dynamicStyle}
    >
      {hasSpecialOffer ? `${discount}% off today` : `-${discount}%`}
    </span>
  );
};

export default DiscountTag;
