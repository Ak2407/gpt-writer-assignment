const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // This function opens the modal
  const openModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Opening modal");
    setIsModalOpen(true);
  };

  // This function closes the modal
  const closeModal = () => {
    console.log("Closing modal");
    setIsModalOpen(false);
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
      <Button onClick={openModal} />
    </div>
  );
};

export default App;
