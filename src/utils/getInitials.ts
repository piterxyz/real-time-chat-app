export default function getInitials(fullName: string) {
    return fullName
        .split(" ")
        .map((name) => name[0])
        .join("");
}
