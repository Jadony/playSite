type discountTagProps = {
  discount: string;
  fromColor?: string;
  toColor?: string;
  normalColor?: string;
};

const DiscountTag = ({
  discount,
  fromColor = "#CA1619",
  toColor = "#C131DE",
  normalColor = "#a855f7",
}: discountTagProps) => {
  return (
    <span
      className={`
                  ${
                    discount.includes("today")
                      ? `bg-gradient-to-r from-[${fromColor}] to-[${toColor}]` // Special tag
                      : `bg-[${normalColor}]` // Default purple tag
                  } 
                   text-white text-xs font-bold px-1 py-1 rounded-md shadow-sm
                `}
    >
      {discount}
    </span>
  );
};

export default DiscountTag;
