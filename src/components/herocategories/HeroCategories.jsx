export default function HeroCategories() {
  const categories = ["Kategorier", "Søknad", "Jobber", "Kontakt", "Om oss"];

  return (
    <>
      <div className="flex">
        {categories.map((category, index) => (
          <div
            key={index}
            className="relative group cursor-pointer overflow-hidden"
          >
            <div className="px-4 pb-1 text-2xl">{category}</div>
            <div className="absolute bottom-0 left-0 bg-black h-0.5 w-0 transform origin-left transition-all duration-300 group-hover:w-full"></div>
          </div>
        ))}
      </div>
      <p className="px-4 mt-2 text-sm max-w-md">
        Finn kreative samarbeidspartnere, skuespillere, regissører og mer.
        Registrering og bruk er helt gratis. Ta del i filmverdenen på
        Filmplassen i dag!
      </p>
    </>
  );
}
