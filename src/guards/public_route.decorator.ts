import { SetMetadata } from '@nestjs/common';
import { PUBLIC_ROUTE } from 'src/constants/guard.const';

export const PublicRoute = () => SetMetadata(PUBLIC_ROUTE, true);
