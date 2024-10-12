import Link from 'next/link';
import Image from 'next/image';

const LinkWithImage = ({ href, src, alt, width, height }) => (
  <Link href={href}>
    <Image src={src} alt={alt} width={width} height={height} />
  </Link>
);

export default LinkWithImage;
