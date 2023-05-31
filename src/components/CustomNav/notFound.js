import "../../index.css"; 

//Another Additional Component whenever the input string in the definition search bar results to an error and display this component
export default function NotFound() {
  return (
    <>
      
      <div className="not-found-container">
        <p className="not-found-message">The Page or Resource You are Looking For Is Not Found</p>
        <p className="not-found-try">Please Try Again</p>
      </div>
    </>
  );
};
