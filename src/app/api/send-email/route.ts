import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  // Ensure the route is accessed
  console.log('🚀 Send email route accessed');

  try {
    // Validate environment variables
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('❌ Email configuration is incomplete');
      return NextResponse.json(
        { 
          success: false, 
          error: 'Email configuration is incomplete',
          details: {
            EMAIL_HOST: !!process.env.EMAIL_HOST,
            EMAIL_USER: !!process.env.EMAIL_USER,
            EMAIL_PASS: !!process.env.EMAIL_PASS
          }
        },
        { status: 500 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = (formData.get('subject') as string) || 'New Contact Form Submission';
    const message = formData.get('message') as string;

    // Validate required fields
    if (!name || !email || !message) {
      console.log('❌ Missing required fields', { name, email, message });
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields',
          details: { name: !!name, email: !!email, message: !!message }
        },
        { status: 400 }
      );
    }

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Prepare email options
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      text: `
        New Message from Portfolio Contact Form

        Name: ${name}
        Email: ${email}
        Subject: ${subject}

        Message:
        ${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #333; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">New Message from Portfolio</h2>
          
          <div style="margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <h3 style="margin-top: 0; color: #333;">Message:</h3>
            <p style="white-space: pre-line;">${message}</p>
          </div>
        </div>
      `,
    };

    // Send email
    try {
      const info = await transporter.sendMail(mailOptions);
      
      console.log('✅ Email sent successfully', { 
        messageId: info.messageId,
        accepted: info.accepted,
        rejected: info.rejected
      });

      return NextResponse.json(
        { 
          success: true, 
          message: 'Email sent successfully',
          messageId: info.messageId 
        },
        { status: 200 }
      );
    } catch (sendError) {
      console.error('❌ Email sending failed:', sendError);
      
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to send email',
          details: sendError instanceof Error ? sendError.message : 'Unknown error'
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('❌ Unexpected error in email route:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Unexpected error in email processing',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}