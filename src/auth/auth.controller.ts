import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Public } from './public.decorator';
import { AccessTokenResponse } from './dto/access-token-response.dto';

@ApiTags('auth')
@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiCreatedResponse({
    description: 'Logged successfuly',
    type: AccessTokenResponse,
  })
  @Post('login')
  signIn(@Body() signInDto: SignInDto): Promise<AccessTokenResponse> {
    return this.authService.signIn(signInDto);
  }
}
