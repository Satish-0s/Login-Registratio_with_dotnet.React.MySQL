namespace backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string PasswordHash { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string Role { get; set; } = "User";
        public bool IsEmailVerified { get; set; } = false;
        public string? EmailVerificationOtp { get; set; }
        public DateTime? EmailVerificationOtpExpiry { get; set; }
        public string? ResetPasswordOtp { get; set; }
        public DateTime? ResetPasswordOtpExpiry { get; set; }
    }
}
