<!-- Summary Section with Navigation -->

<div style="background:rgb(26, 26, 26); padding: 1.5rem; margin-bottom: 2rem; border-radius: 4px; text-align: center;">
<a href="#introduction" style="color: #007bff; text-decoration: none; margin: 0 10px;">🌟 Introduction </a>
<a href="#sys" style="color: #007bff; text-decoration: none; margin: 0 10px;">🖥️ System Implementation </a>

</div>

<!-- Main Content with Anchor -->
<div id="introduction" style="display: flex; align-items: center; margin: 2rem 0;">
    <div style="flex: 1; padding: 0 15px; color: #fff;">
        <h2 style="font-size: 2rem; color: #007bff;">🌟 Introduction</h2>
        <p>
            This project was developed as part of an intensive two-week course focused on designing effective camera systems. Key features I implemented include:

<li><b>A third-person camera</b> using Bézier curves to create smooth</li>

<li><b>Rail-based camera</b> movement for controlled tracking shots</li>

<li><b>Camera blending</b> to smoothly transition between multiple camera behaviors</li>

<li><b>Security camera</b> system with restricted movement zones</li>

<li><b>Trigger-based camera activation</b> for contextual viewpoint changes</li>

The project emphasized creating responsive, cinematic camera behaviors while exploring technical solutions for common game and simulation camera challenges.
        </p>
    </div>
    <img src="https://i.imgur.com/T9hJwtn.png" 
         alt="Featured Concept Art" 
         style="margin-left: 12px;">
</div>

<div id="sys" style="display: flex; align-items: center; margin: 2rem 0;">
    <div style="flex: 1; color: #fff;">
        <h2 style="font-size: 2rem; color: #007bff;">🖥️ System Implementation </h2>
        <ul style="font-size: 120%;">
<li style= "padding-bottom: 15px">
        <div style="display: flex; align-items: flex-start; gap: 20px; margin-bottom: 20px;">
    <div style="flex: 1; min-width: 0;">
        <span style="color:rgb(164, 208, 255); font-weight: bold;  font-size: 120%">Camera blending</span>
                <p style="margin-bottom: 1.2rem;">
                    <p>This view blending system manages multiple camera perspectives (AViewVolume) with priorities and weights, dynamically adjusting their influence so higher-priority views dominate while lower ones blend proportionally based on remaining weight. </p>
                </p>
    </div>
    <div style="flex-shrink: 0;">
        <img src="https://i.imgur.com/AeJTodq.gif"
             style="width: 600px; max-width: 150%; border: 1px solid #3d4450; border-radius: 4px;">
    </div>
</div>

<details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
    <summary style="cursor: pointer; padding: 8px; background-color: #2a2f3a; color: #fff; font-family: monospace;">
        ViewVolumeBlender.cs and AViewVolume.cs
    </summary>
    <div style="background-color: #1a1a1a; border-radius: 0 0 4px 4px;">
<div>

    public class AViewVolume : MonoBehaviour
    {
        public int priority = 0;
        public AView view;
        [Range(0f,1f)]public float weight;

        private int Uid;
        public static int NextUid;
        public bool isCutOnSwitch = false;

        protected bool IsActive { get; private set; }

        private void Awake()
        {
            Uid = NextUid;
            NextUid++;
        }

        public virtual float ComputeSelfWeight()
        {
            return 1f;
        }

        protected void SetActive(bool isActive)
        {
            if(isCutOnSwitch)
            {
                //ViewVolumeBlender.instance.Update();
                CameraController.instance.Cut();
            }
            if (isActive)
            {
                ViewVolumeBlender.instance.AddVolume(this);
                IsActive = true;
            }
            else
            {
                ViewVolumeBlender.instance.RemoveVolume(this);
                IsActive = false;
            }
        }

        public virtual float GetSelfWeight()
        {
            return weight;
        }
    }

    public class ViewVolumeBlender : MonoBehaviour
    {
        public static ViewVolumeBlender instance;

        private List<AViewVolume> activeViewVolumes = new();
        private Dictionary<AView,List<AViewVolume>> volumesPerViews = new();
        

        private void Awake()
        {
            if (instance == null)
            {
                instance = this;
                DontDestroyOnLoad(gameObject);
            }
            else
            {
                Destroy(this);
            }
        }

        public void AddVolume(AViewVolume viewVolume)
        {
            activeViewVolumes.Add(viewVolume);
            if (volumesPerViews.ContainsKey(viewVolume.view))
            {
                volumesPerViews[viewVolume.view].Add(viewVolume);
            }
            else
            {
                volumesPerViews.Add(viewVolume.view, new List<AViewVolume> { viewVolume });
                viewVolume.view.SetActive(true);
            }
        }

        public void RemoveVolume(AViewVolume viewVolume)
        {
            activeViewVolumes.Remove(viewVolume);

            if (volumesPerViews.ContainsKey(viewVolume.view))
            {
                volumesPerViews[viewVolume.view].Remove(viewVolume);
                if (volumesPerViews[viewVolume.view].Count == 0)
                {
                    volumesPerViews.Remove(viewVolume.view);
                    viewVolume.view.SetActive(false);
                }
            }
            
        }


        private void OnGUI()
        {
            foreach (var view in activeViewVolumes)
            {
                GUILayout.Label(view.gameObject.ToString(),new GUIStyle() { fontSize = 30});
            }
        }

        private void Update()
        {
            foreach (AViewVolume view in activeViewVolumes)
            {
                view.view.weight = 0f;
            }

            List<AViewVolume> sortedList = activeViewVolumes.OrderBy(a => a.priority).ToList();
            float remaningWeight = 1f;
            foreach (var viewVolume in sortedList)
            {
                viewVolume.weight = viewVolume.GetSelfWeight();
                remaningWeight = 1 - viewVolume.GetSelfWeight();
                foreach (var view2 in sortedList)
                {
                    view2.view.weight *= remaningWeight;
                }
                viewVolume.view.weight += viewVolume.weight;
            }
        }
    }

</div>
                </details>
            </li>
    <li style= "padding-bottom: 15px">
        <div style="display: flex; align-items: flex-start; gap: 20px; margin-bottom: 20px;">
    <div style="flex: 1; min-width: 0;">
        <span style="color:rgb(164, 208, 255); font-weight: bold;  font-size: 120%">Rail-based camera</span>
                <p style="margin-bottom: 1.2rem;">
                    <p>The camera can smoothly move along the rail via distance-based positioning or automatically snap to the nearest point on the rail. It supports looping paths and provides visual debugging in the Unity editor with segment lengths and gizmo indicators.</p>
                </p>
    </div>
    <div style="flex-shrink: 0;">
        <img src="https://i.imgur.com/r7MNJYL.png"
             style="width: 600px; max-width: 150%; border: 1px solid #3d4450; border-radius: 4px;">
    </div>
</div>

<details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
    <summary style="cursor: pointer; padding: 8px; background-color: #2a2f3a; color: #fff; font-family: monospace;">
        Rail.cs
    </summary>
    <div style="background-color: #1a1a1a; border-radius: 0 0 4px 4px;">
<div>

    public class Rail : MonoBehaviour
    {
        public bool isLoop = false;
        private float _length = 0f;

        List<Transform> rail = new List<Transform>();
        List<(Vector3, Vector3)> rays = new List<(Vector3, Vector3)>();

        public Transform testPos;

        private void Start()
        {
            for (int i = 0; i < transform.childCount; i++)
            {
                rail.Add(transform.GetChild(i));
            }

            for (int i = 0; i < rail.Count - 1; i++)
            {
                _length += Vector3.Distance(rail[i].position, rail[i + 1].position);
            }
            if (isLoop)
            {
                _length += Vector3.Distance(rail[0].position, rail[rail.Count - 1].position);
            }
        }

        public float GetLength()
        {
            return _length;
        }

        public Vector3 GetPosition(float distance)
        {
            float current = 0f;
            if (!isLoop)
            {
                current = Mathf.Clamp(distance, 0, _length);
            }
            else
            {
                current = Mathf.Repeat(distance, _length);
            }

            int segementCount = rail.Count - 1;
            if (isLoop) segementCount++;
            int resultIndex = 0;
            float resultLerp = 0f;
            for (int i = 0; i < segementCount; i++)
            {
                float dist = Vector3.Distance(rail[i].position, rail[(i + 1) % rail.Count].position);


                if (current <= dist)
                {
                    resultLerp = current / dist;
                    resultIndex = i;
                    break;
                }
                else
                {
                    current -= dist;
                }
            }
            return Vector3.Lerp(rail[resultIndex].position, rail[(resultIndex + 1) % rail.Count].position, resultLerp);
        }

        public Vector3 GetAutoPosition(Vector3 target)
        {
            int segementCount = rail.Count - 1;
            if (isLoop) segementCount++;

            float current = float.MaxValue;
            Vector3 resultPoint = Vector3.zero;

            for (int i = 0; i < segementCount; i++)
            {
                Vector3 projection = MathUtils.GetNearestPointOnSegment(rail[i].position, rail[(i + 1) % rail.Count].position, target);

                if (current > Vector3.Distance(target, projection))
                {
                    current = Vector3.Distance(target, projection);
                    resultPoint = projection;
                }
            }
            return resultPoint;
        }

    #if(UNITY_EDITOR)
        private void OnDrawGizmos()
        {
            List<Transform> gizmoRail = new List<Transform>();
            for (int i = 0; i < transform.childCount; i++)
            {
                gizmoRail.Add(transform.GetChild(i));
            }

            for (int i = 0; i < gizmoRail.Count - 1; i++)
            {
                Gizmos.color = Color.white;
                if (i == 0) Gizmos.color = Color.red;

                Gizmos.DrawSphere(gizmoRail[i].position, 0.1f);
                Gizmos.color = Color.blue;
                Gizmos.DrawLine(gizmoRail[i].position, gizmoRail[i + 1].position);
                Handles.Label(Vector3.Lerp(gizmoRail[i].position, gizmoRail[i + 1].position, 0.5f) + Vector3.up * 0.1f, Vector3.Distance(gizmoRail[i].position, gizmoRail[i + 1].position).ToString().Substring(0, 4));
            }
            Gizmos.DrawSphere(gizmoRail[gizmoRail.Count - 1].position, 0.1f);
            if (isLoop)
            {
                Gizmos.color = Color.blue;
                Gizmos.DrawLine(gizmoRail[0].position, gizmoRail[gizmoRail.Count - 1].position);
                Handles.Label(Vector3.Lerp(gizmoRail[0].position, gizmoRail[gizmoRail.Count - 1].position, 0.5f) + Vector3.up * 0.1f, Vector3.Distance(gizmoRail[0].position, gizmoRail[gizmoRail.Count - 1].position).ToString().Substring(0, 4));
            }
            foreach (var item in rays)
            {
                Gizmos.color = Color.red;
                Gizmos.DrawLine(item.Item1, item.Item2);
            }
        }
    #endif

    }

</div>
                </details>
            </li>
            <li style= "padding-bottom: 15px">
        <div style="display: flex; align-items: flex-start; gap: 20px; margin-bottom: 20px;">
    <div style="flex: 1; min-width: 0;">
        <span style="color:rgb(164, 208, 255); font-weight: bold;  font-size: 120%">A third-person camera</span>
                <p style="margin-bottom: 1.2rem;">
                    This camera controller smoothly blends between multiple active AView configurations (position, rotation, FOV) using weighted averages, with adjustable transition speeds or instant cuts triggered via Cut(). It leverages Bézier curves (via the Curve class) for path-based camera movement and handles circular angle averaging for yaw to ensure natural directional transitions.
                </p>
    </div>
    <div style="flex-shrink: 0;">
        <img src="https://i.imgur.com/QVmRvzo.png"
             style="width: 600px; max-width: 150%; border: 1px solid #3d4450; border-radius: 4px;">
    </div>
</div>

<details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
    <summary style="cursor: pointer; padding: 8px; background-color: #2a2f3a; color: #fff; font-family: monospace;">
        CameraController.cs and Curve.cs
    </summary>
    <div style="background-color: #1a1a1a; border-radius: 0 0 4px 4px;">
<div>

    public class CameraController : MonoBehaviour
    {
        public static CameraController instance;

        private void Awake()
        {
            if (instance == null)
            {
                instance = this;
                DontDestroyOnLoad(gameObject);
            }
            else
            {
                Destroy(this);
            }
        }

        public Camera _camera;
        public CameraConfiguration config;
        public float speed = 0.1f;
        private List<AView> activeViews = new List<AView>();
        private bool isCutRequested = false;
        public bool isInstant = false;

        void Update()
        {
            if(activeViews.Count > 0)
            {
                ApplyConfiguration();
            }

            if(Input.GetKeyDown(KeyCode.R))
            {
                isInstant = !isInstant;
            }
        }

        private void ApplyConfiguration()
        {
            CameraConfiguration cible = ComputeAverage();

            if(isCutRequested || isInstant)
            {
                config = cible;
                if(isCutRequested) isCutRequested = false;
            }
            else
            {
                if (speed * Time.deltaTime < 1)
                {
                    config.pitch += (cible.pitch - config.pitch) * speed * Time.deltaTime;
                    config.roll += (cible.roll - config.roll) * speed * Time.deltaTime;
                    config.fov += (cible.fov - config.fov) * speed * Time.deltaTime;
                    config.distance += (cible.distance - config.distance) * speed * Time.deltaTime;
                    config.pivot = Vector3.Lerp(config.pivot, cible.pivot, speed * Time.deltaTime);
                    config.yaw = Vector2.SignedAngle(Vector2.right, (GetYawVector(cible.yaw) - GetYawVector(config.yaw)) * speed * Time.deltaTime + GetYawVector(config.yaw));
                }
                else
                {
                    config = cible;
                }
            }

            _camera.transform.rotation = config.GetRotation();
            _camera.transform.position = config.GetPosition();
            _camera.fieldOfView = config.fov;
        }

        public void AddView(AView view) => activeViews.Add(view);
        public void RemoveView(AView view) => activeViews.Remove(view);

        private CameraConfiguration ComputeAverage()
        {
            if (activeViews.Count == 1) return activeViews[0].GetConfig();

            CameraConfiguration result = new CameraConfiguration();
            float weightResult = 0f;
            Vector2 sumYaw = Vector2.zero;
            foreach (AView view in activeViews)
            {
                CameraConfiguration config = view.GetConfig();
                weightResult += view.weight;
                sumYaw += ComputeAverageYaw(config.yaw, view.weight);
                result.pitch +=  config.pitch * view.weight;
                result.roll += config.roll * view.weight;
                result.fov += config.fov * view.weight;
                result.distance += config.distance * view.weight;
                result.pivot += config.pivot * view.weight;
            }

            result.yaw = Vector2.SignedAngle(Vector2.right,sumYaw);
            result.pitch /= weightResult;
            result.roll /= weightResult;
            result.fov /= weightResult;
            result.distance /= weightResult;
            result.pivot /= weightResult;

            return result;
        }

        public Vector2 ComputeAverageYaw(float yaw, float weight)
        {
            return GetYawVector(yaw) * weight;
        }

        public Vector2 GetYawVector(float yaw)
        {
            return new Vector2(Mathf.Cos(yaw * Mathf.Deg2Rad), Mathf.Sin(yaw * Mathf.Deg2Rad));
        }

        public void Cut()
        {
            isCutRequested = true;
        }

        private void OnDrawGizmos()
        {
            config.DrawGizmos(Color.blue);
        }
    }

    public class Curve
    {
        public Vector3 a, b, c, d;

        public Vector3 GetPosition(float t)
        {
            return MathUtils.CubicBezier(a, b, c, d, t);
        }

        public Vector3 GetPosition(float t, Matrix4x4 localToWorldMatrix)
        {
            return localToWorldMatrix.MultiplyPoint(GetPosition(t));
        }

        public void DrawGizmo(Color c, Matrix4x4 localToWorldMatrix)
        {
            float resolution = 15f;
            Gizmos.color = c;
            for (float i = 0; i <= resolution; i++)
            {
                Gizmos.DrawSphere(GetPosition(i / resolution, localToWorldMatrix), 0.1f);
            }
        }
    }

</div>
</div>
    </details>
</li>
<li style= "padding-bottom: 15px">
        <div style="display: flex; align-items: flex-start; gap: 20px; margin-bottom: 20px;">
    <div style="flex: 1; min-width: 0;">
        <span style="color:rgb(164, 208, 255); font-weight: bold;  font-size: 120%">Security camera</span>
                <p style="margin-bottom: 1.2rem;">
                    This FixedFollowView camera setup maintains a static position while directing focus toward a target, calculating its yaw (horizontal angle) and pitch (vertical angle) to face the target. It enforces angular limits (yawOffSetMax, pitchOffSetMax) relative to a centralObject, clamping the camera's rotation to prevent abrupt shifts beyond these thresholds—preserving smooth tracking while adhering to defined boundaries.
                </p>
    </div>
    <div style="flex-shrink: 0;">
        <img src="https://i.imgur.com/rjUU50C.gif"
             style="width: 600px; max-width: 150%; border: 1px solid #3d4450; border-radius: 4px;">
    </div>
</div>

<details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
    <summary style="cursor: pointer; padding: 8px; background-color: #2a2f3a; color: #fff; font-family: monospace;">
        FixedFollowView.cs
    </summary>
    <div style="background-color: #1a1a1a; border-radius: 0 0 4px 4px;">
<div>

    public class FixedFollowView : AView
    {
        public float roll;
        public float fov;
        public Transform target;
        public Transform centralObject;
        public float yawOffSetMax;
        public float pitchOffSetMax;
        private float oldYaw;
        private float oldPitch;

        public override CameraConfiguration GetConfig()
        {
            CameraConfiguration config = new CameraConfiguration();
            config.pivot = transform.position;
            config.roll = roll;
            config.fov = fov;
            config.distance = 0;

            Vector3 dir = target.position - config.pivot;
            dir.Normalize();
            config.yaw = Mathf.Atan2(dir.x, dir.z) * Mathf.Rad2Deg;
            config.pitch = Mathf.Clamp(-Mathf.Asin(dir.y) * Mathf.Rad2Deg, -90f, 90f);
            
            if(config.yaw < 0)
            {
                config.yaw += 360;
            }
            Vector3 dir2 = centralObject.position - config.pivot;
            dir2.Normalize();
            float angleYaw = Vector3.Angle(new Vector3(dir.x,0, dir.z), new Vector3(dir2.x, 0, dir2.z));
            float anglePitch = Vector2.Angle(dir, dir2);

            if(angleYaw > yawOffSetMax)
            {
                config.yaw = oldYaw;
            }
            else
            {
                oldYaw = config.yaw;
            }

            if (anglePitch > pitchOffSetMax)
            {
                config.pitch = oldPitch;
            }
            else
            {
                oldPitch = config.pitch;
            }
            return config;
        }
    }

</div>
</div>
    </details>
</li>
<li style= "padding-bottom: 15px">
        <div style="display: flex; align-items: flex-start; gap: 20px; margin-bottom: 20px;">
    <div style="flex: 1; min-width: 0;">
        <span style="color:rgb(164, 208, 255); font-weight: bold;  font-size: 120%">Trigger-based camera activation</span>
                <p style="margin-bottom: 1.2rem;">
                    This FixedFollowView camera setup maintains a static position while directing focus toward a target, calculating its yaw (horizontal angle) and pitch (vertical angle) to face the target. It enforces angular limits (yawOffSetMax, pitchOffSetMax) relative to a centralObject, clamping the camera's rotation to prevent abrupt shifts beyond these thresholds—preserving smooth tracking while adhering to defined boundaries.
                </p>
    </div>
    <div style="flex-shrink: 0;">
        <img src="https://i.imgur.com/mI5HUBx.jpeg"
             style="width: 600px; max-width: 150%; border: 1px solid #3d4450; border-radius: 4px;">
    </div>
</div>

<details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
    <summary style="cursor: pointer; padding: 8px; background-color: #2a2f3a; color: #fff; font-family: monospace;">
        TriggeredViewVolume.cs
    </summary>
    <div style="background-color: #1a1a1a; border-radius: 0 0 4px 4px;">
<div>

    public class TriggeredViewVolume : AViewVolume
    {

        private void OnTriggerEnter(Collider other)
        {
            if (other.gameObject.CompareTag("Player"))
            {
                SetActive(true);
            }
        }

        private void OnTriggerExit(Collider other)
        {
            if (other.gameObject.CompareTag("Player"))
            {
                SetActive(false);
            }
        }

    
    }

</div>
</div>
    </details>
</li>