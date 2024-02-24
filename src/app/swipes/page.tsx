import { permanentRedirect } from "next/navigation";

export default function Swipes() {
    // TODO добавить логику подбора людей
    permanentRedirect("/swipes/0");
    return <div>...Loading</div>;
}