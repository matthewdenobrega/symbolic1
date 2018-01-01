// Angular imports
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'

// App imports
import { AgentComponent } from './agent.component'

describe('AgentComponent', () => {
  let component: AgentComponent
  let fixture: ComponentFixture<AgentComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
