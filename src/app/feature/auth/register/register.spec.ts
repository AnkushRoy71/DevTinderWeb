import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import Register from './register';

describe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Register, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render signup fields and login link', () => {
    const text = fixture.nativeElement.textContent;

    expect(text).toContain('First name');
    expect(text).toContain('Last name');
    expect(text).toContain('Email');
    expect(text).toContain('Password');
    expect(text).toContain('Login');
  });
});
