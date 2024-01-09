import { ProviderWrapper as PhonebookProviderWrapper} from "/src/Contexts/PhonebookContext"
import App from "/src/Components/App.jsx";

const AppLoader = () => {
  return (
    <PhonebookProviderWrapper >
      <App />
    </PhonebookProviderWrapper >
  )
}

export default AppLoader