namespace NotificationService.Domain.Dtos.Emails
{
    public class NewUserEmail : Email
    {
        public string UserType { get; set; }
        public string StoreName { get; set; }
        public string AdminPanelUrl { get; set; }
        public List<string> Responsibilities { get; set; }

        public NewUserEmail(Contact contact, string userType, string storeName, string adminPanelUrl, List<string> responsibilities) : base(contact)
        {
            UserType = userType;
            StoreName = storeName;
            AdminPanelUrl = adminPanelUrl;
            Responsibilities = responsibilities;
        }
    }
}