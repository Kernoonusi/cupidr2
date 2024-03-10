const ChatLayout = ({
  children,
  room,
}: {
  children: React.ReactNode;
  room: React.ReactNode;
}) => {
  return (
    <main className="w-full mx-auto mt-4 sm:flex sm:max-w-7xl">
      {children}
      <div className="hidden sm:flex">
        {room}
      </div>
    </main>
  );
};

export default ChatLayout;
