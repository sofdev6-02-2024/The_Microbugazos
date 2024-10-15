using EmailNotificationService.Concretes;
using DotNetEnv;

namespace EmailNotificationService;

public static class Program
{
    private static async Task InitExecution()
    {
        Env.Load();

        var emailUsername = Environment.GetEnvironmentVariable("EMAIL_USERNAME");
        var emailPassword = Environment.GetEnvironmentVariable("EMAIL_PASSWORD");
        var emailReceiver = Environment.GetEnvironmentVariable("RECEIVER_USERNAME");
        
        var gmailService = new GmailService(emailUsername!, emailPassword!);
        await gmailService.SendSimpleNotificationAsync(emailReceiver!);
    }

    public static void Main(string[] args)
    {
        InitExecution().Wait();
    }
}