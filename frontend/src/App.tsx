import { Button } from "./components/ui/button";

const App = () => {
  const getToken = async () => {};

  return (
    <div className="flex justify-center items-center w-full min-h-screen flex-col gap-y-6">
      <Button>Continue with Google</Button>
      <Button>Logout</Button>
    </div>
  );
};

export default App;
