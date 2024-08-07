const Footer = () => {
  return (
    <div className='bg-blue-800 py-10 px-4'>
      <div className='container mx-auto flex flex-col lg:flex-row justify-center md:justify-between items-center'>
        <span className='text-3xl text-white font-semibold tracking-tight'>
          MernHolidays.com
        </span>
        <p className='text-white font-bold tracking-tight flex gap-4'>
          <span className='cursor-pointer'>Privacy Policy</span>
          <span className='cursor-pointer'>Terms of Service</span>
        </p>
      </div>
    </div>
  )
}

export default Footer