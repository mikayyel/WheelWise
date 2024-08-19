import "./App.css";
import Slider from "./components/Slider";

function App() {
  const data = [
    {
      url: "https://attarmenia.com/upload/2017/06/upOOdqIv.jpg",
      title: "View from Yerevan",
    },
    {
      url: "https://i.pinimg.com/originals/e5/95/b3/e595b30c6174b0acbc1b03a3540f6532.jpg",
      title: "View from Khor Virap(1)",
    },
    {
      url: "https://cdn.araratour.com/file_manager/files/The%20Sights%20of%20Armenia/%D0%9Conasteries%20and%20Temples/khor-virap.jpg",
      title: "View from Khor Virap(2)",
    },
    {
      url: "https://t4.ftcdn.net/jpg/04/76/39/73/360_F_476397323_8AiEBj82V3R9bKtDNuGTUDwBPlAd8ogC.jpg",
      title: "View from Tsolakert(Igdir)",
    },
    {
      url: "https://t3.ftcdn.net/jpg/04/11/96/78/360_F_411967840_DcpUvivVlbFy0Hu2XeKyO6Hsfuh6tC0w.jpg",
      title: "View from the Ararat valley",
    },
  ];
  return (
    <div className="App">
      <div className="heading">Ararat mountain</div>
      <Slider data={data} />
    </div>
  );
}

export default App;
