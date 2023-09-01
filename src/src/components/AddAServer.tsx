const AddAServer = () => {
  return (
    <div className="flex flex-row sm:flex-col items-center">
      <button
        className="group transition flex justify-center items-center sm:my-4 mx-6 hover:scale-110 h-[2em] w-[2em] rounded-full p-4 text-4xl bg-[#5C5470] hover:bg-[#B9B4C7] drop-shadow-xl hover:drop-shadow-none"
        onClick={() => {}}
      >
        <svg
          className="transition group-hover:scale-110 fill-[#FAF0E6] group-hover:fill-[#5C5470]"
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 448 512"
        >
          <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
        </svg>
      </button>
      <p className="font-robotomono text-[#B9B4C7]">Add a server</p>
    </div>
  );
};

export default AddAServer;
