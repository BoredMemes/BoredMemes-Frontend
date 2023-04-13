// @flow
import React, { useEffect, useRef } from "react";
interface Props {
    className: string,
    botName: string,
    dataOnauth: any,
    buttonSize: string,
    cornerRadius: number,
    requestAccess: string,
    usePic: boolean,
    dataAuthUrl: string,
    lang: string,
    children: any,
}
export const TelegramLoginButton = ({
    className,
    botName,
    dataOnauth,
    buttonSize,
    cornerRadius,
    requestAccess,
    usePic = true,
    dataAuthUrl,
    lang,
    children,
}: Props) => {
    const telegramRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        window.TelegramLoginWidget = {
            dataOnauth: (user) => dataOnauth(user),
        };
        const script = document.createElement("script");
        script.src = "https://telegram.org/js/telegram-widget.js?22";
        script.setAttribute("data-telegram-login", botName);
        script.setAttribute("data-size", buttonSize);
        if (!!cornerRadius) {
            script.setAttribute("data-radius", cornerRadius + "");
        }
        script.setAttribute("data-request-access", requestAccess);
        script.setAttribute("data-userpic", usePic + "");
        script.setAttribute("data-lang", lang);
        if (!!dataAuthUrl) {
            script.setAttribute("data-auth-url", dataAuthUrl);
        } else {
            script.setAttribute(
                "data-onauth",
                "TelegramLoginWidget.dataOnauth(user)"
            );
        }
        script.async = true;
        if (telegramRef.current)telegramRef.current.appendChild(script);
    }, [])

    return (
        <div
            className={className}
            ref={telegramRef}
        >
            {children}
        </div>
    );
}
