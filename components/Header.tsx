import Image from "next/image";
import Github from "./Github";
import { useLocalStorage } from "react-use";
import { checkOpenaiApiKey } from "@/lib/openai/openai";
import { toast } from "react-hot-toast";
import { useTranslation } from 'next-i18next';

export default function Header() {
    const [userKey, setUserKey] = useLocalStorage<string>("user-openai-apikey-trans");
    const {t} = useTranslation("common");
    const { i18n } = useTranslation();

    const changeLang = () => {
        const newLang = i18n.language === "en"? "zh-CN" : "en";
        i18n.changeLanguage(newLang);
    }

    const setOpenAIKey = () => {
        const key = prompt(t("Request-Key")!);
        if (key && checkOpenaiApiKey(key)) {
            setUserKey(key);
            toast.success(t("OpenAI API key successfully set"));
        } else {
            toast.error(t("OpenAI API key is invalid"));
        }
    }

    return (
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
            <div style={{marginLeft: "10px", marginTop: "10px"}}>
                <Github width="33" height="33"></Github>
            </div>
            <div style={{marginRight: "10px", marginTop: "10px"}}>
                <Image onClick={changeLang} style={{marginRight: "20px"}} alt="settings" width={33} height={33} src="/trans.png" />
                <Image onClick={setOpenAIKey} alt="settings" width={33} height={33} src="/set1.png" />
            </div>
        </div>
    )
}