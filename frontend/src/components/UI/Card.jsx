const Card = ({ title, children }) => {
  return (
    <div className="bg-white border rounded-xl shadow-sm p-6">

      {title && (
        <h3 className="font-semibold text-gray-700 mb-4">
          {title}
        </h3>
      )}

      {children}

    </div>
  );
};

export default Card;