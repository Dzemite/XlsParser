export interface AppConfig {
    /**
     * Номер порта, число
     */
    port: number;

    /**
     * URL для авторизации в Forms
     */
    authUrl: string;


    /**
     * Параметры авторизации в Forms
     */
    authConfig: object;

    /**
     * Дефолтные настройки для отправки бага(таски) в Jira
     */
    defaultJiraConfig: object;

    /**
     * Данные авторизации в Jira
     */
    jiraAuthConfig: object;
}