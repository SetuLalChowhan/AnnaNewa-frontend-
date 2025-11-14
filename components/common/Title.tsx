interface TitleProps {
  className?: string;
  children: React.ReactNode;
}

export const Title18 = ({ className, children }: TitleProps) => (
  <h2 className={`${className} text-lg font-semibold text-gray-800 `}>
    {children}
  </h2>
);
export const Title14 = ({ className, children }: TitleProps) => (
  <h2 className={`${className} text-sm text-secondaryColor line-clamp-2 `}>
    {children}
  </h2>
);
export const TitleBase = ({ className, children }: TitleProps) => (
  <h2 className={`${className} text-primaryColor font-medium `}>
    {children}
  </h2>
);
export const Title36 = ({ className, children }: TitleProps) => (
  <h2 className={`${className} text-4xl font-bold text-gray-800 mb-10 `}>
    {children}
  </h2>
);
export const Title20 = ({ className, children }: TitleProps) => (
  <h2 className={`${className} text-[20px] font-bold text-gray-800  `}>
    {children}
  </h2>
);







