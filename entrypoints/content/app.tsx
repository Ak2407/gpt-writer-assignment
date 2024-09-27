const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // This function opens the modal
  const openModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  // This function closes the modal
  const closeModal = () => {
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
