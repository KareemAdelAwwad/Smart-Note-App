export const forgetPasswordTemplate = (name, OTP) => `<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password - AI Notes</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; font-family: 'Poppins', Arial, sans-serif; background: #f8fafc;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width: 100%; background: #f8fafc; padding: 40px 20px;">
        <tr>
            <td style="text-align: center;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width: 500px; margin: 0 auto; background: white; border-radius: 16px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); overflow: hidden;">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 32px; text-align: center;">
                            <h1 style="color: white; font-size: 24px; font-weight: 700; margin: 0; font-family: 'Poppins', Arial, sans-serif;">AI Notes</h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 32px; text-align: center;">
                            <h2 style="color: #1a202c; font-size: 22px; font-weight: 600; margin: 0 0 16px 0; font-family: 'Poppins', Arial, sans-serif;">Reset Your Password</h2>
                            
                            <p style="color: #4a5568; font-size: 16px; margin: 0 0 32px 0; font-family: 'Poppins', Arial, sans-serif;">Hi <strong>${name}</strong>, use this code to reset your password:</p>
                            
                            <!-- OTP -->
                            <div style="background: #f7fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 0 0 24px 0;">
                                <div style="font-size: 36px; font-weight: 700; color: #4f46e5; letter-spacing: 6px; font-family: 'Poppins', monospace;">${OTP}</div>
                                <p style="color: #718096; font-size: 14px; margin: 12px 0 0 0; font-family: 'Poppins', Arial, sans-serif;">Expires in 10 minutes</p>
                            </div>
                            
                            <p style="color: #718096; font-size: 14px; margin: 0; font-family: 'Poppins', Arial, sans-serif;">If you didn't request this, please ignore this email.</p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background: #f8fafc; padding: 24px; text-align: center; border-top: 1px solid #e2e8f0;">
                            <p style="color: #a0aec0; font-size: 12px; margin: 0; font-family: 'Poppins', Arial, sans-serif;">© 2025 AI Notes App</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

export const passwordResetSuccessTemplate = (name) => `<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Successful - AI Notes</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; font-family: 'Poppins', Arial, sans-serif; background: #f8fafc;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width: 100%; background: #f8fafc; padding: 40px 20px;">
        <tr>
            <td style="text-align: center;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width: 500px; margin: 0 auto; background: white; border-radius: 16px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); overflow: hidden;">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 32px; text-align: center;">
                            <h1 style="color: white; font-size: 24px; font-weight: 700; margin: 0; font-family: 'Poppins', Arial, sans-serif;">AI Notes</h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 32px; text-align: center;">
                            <!-- Success Icon -->
                            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 50%; margin: 0 auto 24px; display: inline-flex; align-items: center; justify-content: center; box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            
                            <h2 style="color: #1a202c; font-size: 22px; font-weight: 600; margin: 0 0 16px 0; font-family: 'Poppins', Arial, sans-serif;">Password Reset Successful!</h2>
                            
                            <p style="color: #4a5568; font-size: 16px; margin: 0 0 32px 0; line-height: 1.5; font-family: 'Poppins', Arial, sans-serif;">Hi <strong>${name}</strong>, your password has been successfully updated. Your account is now secure.</p>
                            
                            <!-- Success Message -->
                            <div style="background: linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%); border: 1px solid #bbf7d0; border-radius: 12px; padding: 24px; margin: 0 0 32px 0;">
                                <p style="color: #065f46; font-size: 14px; margin: 0; font-weight: 500; font-family: 'Poppins', Arial, sans-serif;">✓ You can now log in with your new password</p>
                            </div>
                            
                            <!-- CTA Button -->
                            <a href="#" style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block; font-family: 'Poppins', Arial, sans-serif; box-shadow: 0 4px 14px rgba(79, 70, 229, 0.3); transition: all 0.2s;">Open AI Notes</a>
                            
                            <p style="color: #718096; font-size: 14px; margin: 24px 0 0 0; font-family: 'Poppins', Arial, sans-serif;">If you didn't make this change, please contact support immediately.</p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background: #f8fafc; padding: 24px; text-align: center; border-top: 1px solid #e2e8f0;">
                            <p style="color: #a0aec0; font-size: 12px; margin: 0; font-family: 'Poppins', Arial, sans-serif;">© 2025 AI Notes App</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;