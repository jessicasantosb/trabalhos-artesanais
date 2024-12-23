type HeadingProps = {
  title: string;
  subtitle: string;
};

export function Heading({ title, subtitle }: HeadingProps) {
  return (
    <div className="text-center">
      <h1 className='pt-14 pb-2 font-medium text-4xl'>{title}</h1>
      <p className='pb-14 text-center'>{subtitle}</p>
    </div>
  );
}
