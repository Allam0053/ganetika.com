import Image from 'next/image';

const MDXComponents = {
  CloudinaryImg: (..._params: unknown[]) => 'CloudinaryImg Placeholder',
  CloudinaryVideoPlayer: (..._params: unknown[]) => 'CloudinaryVideoPlayer Placeholder',
  Image,
};

export default MDXComponents;
