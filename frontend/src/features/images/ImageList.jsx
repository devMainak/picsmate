import ImageLink from "./ImageLink";

const ImageList = ({ images }) => {
  console.log(images);
  return (
    <div>
      {images.length ? (
        <div className="grid grid-cols-6 gap-2">
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
