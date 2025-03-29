namespace Backend.Domain.Entities.Concretes
{
    public class Contact
    {
        public string ContactName { get; set; }
        public string ContactEmail { get; set; }

        public Contact(string contactName, string contactEmail)
        {
            ContactName = contactName;
            ContactEmail = contactEmail;
        }
    }
}