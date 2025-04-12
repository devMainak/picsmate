import ImageLink from "./ImageLink";

const ImageList = ({ images }) => {
  return (
    <div>
      {images.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1.5">
          {images.map((image) => (
            <ImageLink image={image} key={image._id} />
          ))}
        </div>
      ) : (
        <div>Add images to see here.</div>
      )}
    </div>
  );
};

export default ImageList;
