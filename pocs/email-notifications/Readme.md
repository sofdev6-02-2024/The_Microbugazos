# Notifications Services/Providers 

## Objective of the POC:
As Product Owner, I want to identify and test the best free option for email notifications, so that we can implement a reliable and cost-effective solution for communicating with users without compromising deliverability.

## Email Services & Providers:
Some notification providers and services are:

### 1. **Gmail (SMTP)**

- **Description**: Gmail is one of the most widely used email services globally. It allows sending emails using the SMTP protocol, making it accessible for many applications.
- **Features**:
    - 15 GB of storage capacity.
    - Spam filtering and advanced security.
    - Integration with other Google services.
- **Limitations**:
    - Sending limit of 500 emails per day (for personal accounts).
    - Requires enabling "Allow less secure apps" if not using OAuth 2.0.
- **Documentation**: [SMTP Relay Service](https://support.google.com/a/answer/176600?hl=en)

### 2. **SendGrid**

- **Description**: SendGrid is a service for sending transactional and marketing emails that facilitates bulk and transactional email delivery.
- **Features**:
    - RESTful API for sending emails.
    - Analytics and tracking tools.
    - Integration with various programming languages and platforms.
- **Limitations**:
    - Free plan allows up to 100 emails per day.
    - Advanced features are only available in paid plans.
- **Documentation**: [SendGrid API Documentation](https://docs.sendgrid.com/)

### 3. **Mailgun**

- **Description**: Mailgun is a service designed for developers that allows sending, receiving, and tracking emails via an API.
- **Features**:
    - Sending emails through an easy-to-use API.
    - Detailed analytics and delivery statistics.
    - Integration with other applications and services.
- **Limitations**:
    - The free plan allows sending up to 5,000 emails during the first three months, after which it limits to 1,000 emails per month.
    - Domain verification is required to use the service.
- **Documentation**: [Mailgun Documentation](https://documentation.mailgun.com/en/latest/)

### 4. **Amazon SES (Simple Email Service)**

- **Description**: Amazon SES is a scalable and low-cost email service that integrates with other cloud applications on AWS.
- **Features**:
    - Sending emails via API or SMTP.
    - High performance and high delivery rates.
    - Analytics and monitoring features.
- **Limitations**:
    - Free usage is limited to 62,000 emails per month if sent from an application hosted on Amazon EC2.
    - Domain and/or email address verification is required to prevent unauthorized use.
- **Documentation**: [Amazon SES Documentation](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/Welcome.html)

### 5. **SMTP2GO**

- **Description**: SMTP2GO is an SMTP provider that offers an easy-to-use platform for sending emails and optimizing delivery.
- **Features**:
    - Easy-to-configure and user-friendly platform.
    - Detailed reports on email delivery and performance.
    - Monitoring and diagnostic tools.
- **Limitations**:
    - The free plan allows sending up to 1,000 emails per month.
    - Some advanced features may be restricted on the free plan.
- **Documentation**: [SMTP2GO Documentation](https://www.smtp2go.com/)

### Provider Comparison

| Provider   | Free Plan                          | Sending Limit                 | Key Features                                           | Documentation Link                 |
|------------|------------------------------------|-------------------------------|-------------------------------------------------------|------------------------------------|
| Gmail      | Yes (500 emails/day)               | 500 emails/day                | Spam filters, integration with Google                  | [Gmail SMTP Relay Service](https://support.google.com/a/answer/176600?hl=en) |
| SendGrid   | 100 emails/day                     | 100 emails/day                | RESTful API, analytics and tracking                    | [SendGrid API Documentation](https://docs.sendgrid.com/) |
| Mailgun    | 5,000 emails in 3 months          | 1,000 emails/month afterward  | Detailed analytics, easy integration                   | [Mailgun Documentation](https://documentation.mailgun.com/en/latest/) |
| Amazon SES | Yes (62,000 emails/month from EC2)| Depends on the application    | High performance, analytics and monitoring             | [Amazon SES Documentation](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/Welcome.html) |
| SMTP2GO    | 1,000 emails/month                 | 1,000 emails/month            | Delivery reports, diagnostic tools                     | [SMTP2GO Documentation](https://www.smtp2go.com/docs/) |

### Provider Evaluation

1. **Ease of Use**: How easy is it to integrate the service into your application?
2. **Delivery Rate**: How effective is the service in ensuring that emails reach the recipients?
3. **Documentation**: How clear and accessible is the documentation provided by the provider?
4. **Support**: What kind of support does the provider offer in case of issues?

## Conclusion

Based on the example we were able to identify which using the SMTP protocol for email notifications best suits our needs, both in terms of ease of implementation and correct operation.

In our example applying or implementing this protocol:
1. **Creation of `GmailService`**: When `GmailService` is instantiated, the constructor of the base class (`BaseEmailService`) configures the SMTP client with Gmail’s settings.
2. **Call to `SendSimpleNotificationAsync`**: This method calls `SendEmailAsync`, which configures and sends the message with the predefined subject and body.
3. **Asynchronous Sending**: `SendEmailAsync` sends the message using `SmtpClient`, allowing the application to continue running while the email is sent in the background.