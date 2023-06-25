/** @type {import('next').NextConfig} */
const nextConfig = {
  future:{
  	webpack5: true
  },
  webpack(config){
  	config.resolve.fallback = {
  		...config.resolve.fallback,
  		fs:false
  	};
  	return config;
  },
  reactStrictMode: false,
  images:{
  	domains:['ik.imagekit.io']
  },
}

module.exports = nextConfig