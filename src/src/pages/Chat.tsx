const Chat = () => {
  return (
    <div>
      <form>
        <input
          className="border-2 border-black"
          placeholder="Type your message here"
          type="text"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
