import { AuthorizationDto } from '../dto/authorization.dto';
import { CaptureDto } from '../dto/capture.dto';
import { RefundsDto } from '../dto/refunds.dto';
import { ShowRefundsDto } from '../dto/ShowRefunds.dto';

export interface IpaymentGateway {
    authorization(authorizationDto: AuthorizationDto): Promise<string>;
    show(tid: string): Promise<any>;
    capture(tid: string, captureDto: CaptureDto): Promise<object>;
    refunds(id: string, refundsDto: RefundsDto): Promise<object>;
    showRefunds(id: string, refundsDto: ShowRefundsDto): Promise<object>;
}
