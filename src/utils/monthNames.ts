const monthNames = [...Array(12).keys()].map((key) => {
    return new Date(0, key).toLocaleString("en", { month: "long" });
});

export default monthNames;
