using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.DTOs;
using backend.Models;
using backend.Services;
using BCrypt.Net;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly TokenService _tokenService;

        public AuthController(AppDbContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        private string GenerateOtp()
        {
            var random = new Random();
            return random.Next(100000, 999999).ToString();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
            {
                return BadRequest(new { message = "Email is already taken" });
            }

            var otp = GenerateOtp();
            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = dto.Role,
                IsEmailVerified = false,
                EmailVerificationOtp = otp,
                EmailVerificationOtpExpiry = DateTime.UtcNow.AddMinutes(15)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Simulate sending email by logging to Backend Console
            Console.WriteLine("\n=========================================");
            Console.WriteLine($"[EMAIL SIMULATION] To: {user.Email}");
            Console.WriteLine($"Subject: Verify your email address");
            Console.WriteLine($"Your verification OTP is: {otp}");
            Console.WriteLine("=========================================\n");

            // For testing purposes in the assignment: Return OTP in the API response
            return Ok(new { 
                message = "User registered. Please check the 'otp' field below or the console for verification.", 
                otp = otp 
            });
        }

        [HttpPost("verify-email")]
        public async Task<IActionResult> VerifyEmail(VerifyEmailDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null || user.EmailVerificationOtp != dto.Otp)
            {
                return BadRequest(new { message = "Invalid or incorrect OTP" });
            }
            if (user.EmailVerificationOtpExpiry < DateTime.UtcNow)
            {
                return BadRequest(new { message = "OTP has expired" });
            }

            user.IsEmailVerified = true;
            user.EmailVerificationOtp = null;
            user.EmailVerificationOtpExpiry = null;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Email verified successfully. You can now login." });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }

            if (!user.IsEmailVerified)
            {
                return StatusCode(403, new { message = "Please verify your email before logging in." });
            }

            var token = _tokenService.CreateToken(user);
            return Ok(new { 
                token, 
                user = new UserDto { Id = user.Id, Name = user.Name, Email = user.Email, Role = user.Role, IsEmailVerified = user.IsEmailVerified } 
            });
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null)
            {
                // For the assignment, make it easy to see if you mistyped the email or if the DB dropped
                return BadRequest(new { message = "Email not found in the database. Please register first." });
            }

            var otp = GenerateOtp();
            user.ResetPasswordOtp = otp;
            user.ResetPasswordOtpExpiry = DateTime.UtcNow.AddMinutes(15);
            await _context.SaveChangesAsync();

            Console.WriteLine("\n=========================================");
            Console.WriteLine($"[EMAIL SIMULATION] To: {user.Email}");
            Console.WriteLine($"Subject: Reset your password");
            Console.WriteLine($"Your password reset OTP is: {otp}");
            Console.WriteLine("=========================================\n");

            // For testing purposes in the assignment: return the OTP right in the API response
            return Ok(new { 
                message = "If your email is registered, an OTP has been generated.", 
                otp = otp 
            });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null || user.ResetPasswordOtp != dto.Otp)
            {
                return BadRequest(new { message = "Invalid or incorrect OTP" });
            }
            if (user.ResetPasswordOtpExpiry < DateTime.UtcNow)
            {
                return BadRequest(new { message = "OTP has expired" });
            }

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
            user.ResetPasswordOtp = null;
            user.ResetPasswordOtpExpiry = null;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Password has been reset successfully. You can now login." });
        }
    }
}
