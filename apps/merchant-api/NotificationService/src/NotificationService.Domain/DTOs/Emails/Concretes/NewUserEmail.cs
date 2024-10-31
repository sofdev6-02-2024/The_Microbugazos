namespace NotificationService.Domain.Dtos.Emails
{
    public class NewUserEmail : Email
    {
        public string UserType { get; set; }
        public string StoreName { get; set; }
        public string AdminPanelUrl { get; set; }
        public string StoreEmail { get; set; }
        public List<string> Responsibilities { get; set; }
        private const string SubjectEmail = "New User";

        public NewUserEmail(Contact contact, string userType, string storeName, string adminPanelUrl, List<string> responsibilities, string storeEmail, string subject) : base(contact, SubjectEmail)
        {
            UserType = userType;
            StoreName = storeName;
            StoreEmail = storeEmail;
            AdminPanelUrl = adminPanelUrl;
            Responsibilities = responsibilities;
        }
    }
}